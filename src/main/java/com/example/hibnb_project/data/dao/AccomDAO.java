package com.example.hibnb_project.data.dao;

import com.example.hibnb_project.data.entity.AccomEntity;
import com.example.hibnb_project.data.entity.BookEntity;
import com.example.hibnb_project.data.entity.ImgEntity;
import com.example.hibnb_project.data.entity.UserEntity;
import com.example.hibnb_project.data.repository.AccomRepository;
import com.example.hibnb_project.data.repository.BookRepository;
import com.example.hibnb_project.data.repository.ImgRepository;
import com.example.hibnb_project.data.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.*;
import java.util.function.Consumer;

@Service
@RequiredArgsConstructor
public class AccomDAO {
    private final AccomRepository accomRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    //카카오
    @Value("${kakao.api.key}")
    private String kakaoApiKey;


    @Value("${upload.dir}")
    private String uploadDir;


    public List<AccomEntity> findAllAccoms() {
        List<AccomEntity> accomEntityList=this.accomRepository.findAll();
        return accomEntityList;
    }

    public List<AccomEntity> findDetailedAccom(String addr, LocalDate checkinDate, LocalDate checkoutDate, Integer capacity){
        List<AccomEntity> accomEntityList=this.accomRepository.findDetailedAccom("%"+addr+"%",checkinDate,checkoutDate,capacity);
        return accomEntityList;
    }

    public List<BookEntity> findTop5Books() {
        return this.bookRepository.findTop5ByOrderByAccomidDesc();
    }

    public AccomEntity findById(Integer id) {
        return accomRepository.findById(id).orElse(null);
    }

    public List<AccomEntity> findByHostid(String hostid) {
        UserEntity user = this.userRepository.findByUsername(hostid).orElse(null);
        if (user == null) {
            // 사용자 없으면 빈 리스트 반환하거나 예외 대신 빈 리스트 반환 권장
            return Collections.emptyList();
        }
        List<AccomEntity> accomEntityList = this.accomRepository.findByHostid(user);
        return accomEntityList;
    }


     @Transactional
    public void saveAccom(String hostid, String hostname, String address
    , String detailaddr, String description, String type, String imageUrl
    , Integer maxCapacity, Integer pricePernight, Integer bedrooms, Integer beds, Integer bathrooms, MultipartFile[] images) throws IOException {

        // 1. User(Host) 엔티티 조회
        UserEntity hostUser = this.userRepository.findById(hostid)
                .orElseThrow(() -> new EntityNotFoundException("유저를 찾을 수 없습니다."));

        // 2. AccomEntity 와 ImgEntity 객체 생성 (아직 DB에 저장하지 않음!)
        AccomEntity newAccom = AccomEntity.builder()
                .hostid(hostUser)
                .hostname(hostname)
                .address(address)
                .detailaddr(detailaddr)
                .description(description)
                .type(type)
                .imageUrl("temp_value") // 임시값 또는 대표이미지 URL을 이곳에서 설정
                .maxcapacity(maxCapacity)
                .pricePerNight(pricePernight)
                .bedrooms(bedrooms)
                .beds(beds)
                .bathrooms(bathrooms)
                .build();

         //2-1.위도 경도 생성
         if (newAccom.getLatitude() == null || newAccom.getLongitude() == null) {
             Map<String, Double> coords = getCoordinatesFromAddress(newAccom.getAddress());
             if (coords != null) {
                 newAccom.setLatitude(coords.get("lat"));
                 newAccom.setLongitude(coords.get("lng"));
             }
         }

        ImgEntity newImg = new ImgEntity();

        newAccom.setImg(newImg);


        Integer count = 0;
        for (MultipartFile file : images) {
            count++;
            if (file.isEmpty()) continue; // 파일이 비어있으면 건너뛰기

            String originalFilename = file.getOriginalFilename();
            String fileName = UUID.randomUUID() + "_" + originalFilename;

            String fileUrl = "accom/" + fileName;
            Path filePath = Paths.get(uploadDir + fileUrl);

            String fullUrl = "http://localhost:8080/src/main/resources/static/upload/" + fileUrl;


            switch (count) {
                case 1 -> newImg.setImg1(fullUrl);
                case 2 -> newImg.setImg2(fullUrl);
                case 3 -> newImg.setImg3(fullUrl);
                case 4 -> newImg.setImg4(fullUrl);
            }

            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());
        }

        this.accomRepository.save(newAccom);
    }

    @Transactional
    public void updateAccom(Integer id, String hostid, String hostname, String address,
                            String detailaddr, String description, String type,
                            Integer maxCapacity, Integer pricePernight, Integer bedrooms, Integer beds, Integer bathrooms,
                            MultipartFile[] newImages, List<String> urlsToDelete) throws IOException { // 파라미터에 MultipartFile[] 추가

        // 1. 엔티티 조회
        AccomEntity accomToUpdate = this.accomRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("숙소를 찾을 수 없습니다. ID: " + id));

        // 2. 호스트 권한 확인
        if (!accomToUpdate.getHostid().getUsername().equals(hostid)) {
            throw new SecurityException("해당 숙소를 수정할 권한이 없습니다.");
        }

        ImgEntity imgToUpdate = accomToUpdate.getImg();
        if (imgToUpdate == null) {
            imgToUpdate = new ImgEntity();
            accomToUpdate.setImg(imgToUpdate);
        }

        // 3. 기존 이미지 삭제 처리 (클라이언트가 삭제 요청한 URL 기반)
        if (urlsToDelete != null && !urlsToDelete.isEmpty()) {
            for (String urlToDelete : urlsToDelete) {
                // 각 img 필드와 비교하여 일치하면 파일 삭제 및 DB 필드를 null로 설정
                if (urlToDelete.equals(imgToUpdate.getImg1())) {
                    String url = imgToUpdate.getImg1().substring(22);
                    this.deleteFileByUrl("C:/Users/USER/Desktop/myfile/developerStudy/project/teamproject/hibnb_origin/hibnb_test3_refactor"+url);
                    imgToUpdate.setImg1(null);
                } else if (urlToDelete.equals(imgToUpdate.getImg2())) {
                    String url = imgToUpdate.getImg2().substring(22);
                    this.deleteFileByUrl("C:/Users/USER/Desktop/myfile/developerStudy/project/teamproject/hibnb_origin/hibnb_test3_refactor"+url);
                    imgToUpdate.setImg2(null);
                } else if (urlToDelete.equals(imgToUpdate.getImg3())) {
                    String url = imgToUpdate.getImg3().substring(22);
                    this.deleteFileByUrl("C:/Users/USER/Desktop/myfile/developerStudy/project/teamproject/hibnb_origin/hibnb_test3_refactor"+url);
                    imgToUpdate.setImg3(null);
                } else if (urlToDelete.equals(imgToUpdate.getImg4())) {
                    String url = imgToUpdate.getImg4().substring(22);
                    this.deleteFileByUrl("C:/Users/USER/Desktop/myfile/developerStudy/project/teamproject/hibnb_origin/hibnb_test3_refactor"+url);
                    imgToUpdate.setImg4(null);
                }

            }
        }

        // 4. 새로운 이미지 추가 처리
        if (newImages != null && newImages.length > 0) {
            // ImgEntity의 setter 메서드를 담을 리스트 (빈 슬롯)
            List<Consumer<String>> availableSlots = new ArrayList<>();
            if (imgToUpdate.getImg1() == null) availableSlots.add(imgToUpdate::setImg1);
            if (imgToUpdate.getImg2() == null) availableSlots.add(imgToUpdate::setImg2);
            if (imgToUpdate.getImg3() == null) availableSlots.add(imgToUpdate::setImg3);
            if (imgToUpdate.getImg4() == null) availableSlots.add(imgToUpdate::setImg4);

            int imageIdx = 0;
            for (MultipartFile file : newImages) {
                if (file.isEmpty()) continue;

                // 더 이상 채울 슬롯이 없으면 중단
                if (imageIdx >= availableSlots.size()) {
                    // 선택: 추가 이미지가 슬롯보다 많을 경우 예외를 던지거나 경고 로그를 남길 수 있음
                    System.out.println("WARN: 이미지 슬롯이 부족하여 일부 이미지가 업로드되지 않았습니다.");
                    break;
                }

                // 파일 저장 로직
                String originalFilename = file.getOriginalFilename();
                String fileName = UUID.randomUUID() + "_" + originalFilename;
                String fileUrl = "accom/" + fileName;
                Path filePath = Paths.get(uploadDir + fileUrl);
                String fullUrl = "http://localhost:8080/src/main/resources/static/upload/" + fileUrl;

                Files.createDirectories(filePath.getParent());
                Files.write(filePath, file.getBytes()); // 파일 저장

                // 비어있는 슬롯에 순서대로 URL 할당
                availableSlots.get(imageIdx).accept(fullUrl); //DB에 URL 저장
                imageIdx++;
            }
            accomToUpdate.setImg(imgToUpdate);
        }

        // 5. AccomEntity의 텍스트 필드 업데이트
        accomToUpdate.setAddress(address);
        accomToUpdate.setDetailaddr(detailaddr);
        accomToUpdate.setDescription(description);
        accomToUpdate.setType(type);
        accomToUpdate.setMaxcapacity(maxCapacity);
        accomToUpdate.setPricePerNight(pricePernight);
        accomToUpdate.setBedrooms(bedrooms);
        accomToUpdate.setBeds(beds);
        accomToUpdate.setBathrooms(bathrooms);

        if (accomToUpdate.getLatitude() == null || accomToUpdate.getLongitude() == null) {
            Map<String, Double> coords = getCoordinatesFromAddress(accomToUpdate.getAddress());
            if (coords != null) {
                accomToUpdate.setLatitude(coords.get("lat"));
                accomToUpdate.setLongitude(coords.get("lng"));
            }
        }

        // 6. 변경된 엔티티 저장
        // @Transactional 안에서는 이 save 호출이 없어도 커밋 시점에 자동으로 UPDATE가 되지만,
        // 명시적으로 호출하여 가독성을 높이고 영속성 컨텍스트를 DB와 동기화할 수 있습니다.
        this.accomRepository.save(accomToUpdate);
    }


    private void deleteFileByUrl(String fileUrl) {
        if (fileUrl == null || fileUrl.isEmpty()) {
            return;
        }
        try {
            Path filePath = Paths.get(fileUrl);
            Files.deleteIfExists(filePath);
        } catch (Exception e) {
            System.err.println("파일 삭제 실패: " + fileUrl + ", 에러: " + e.getMessage());
        }
    }


    public void deleteAccom(Integer id, String hostid) {
        Optional<AccomEntity> accomEntity= this.accomRepository.findById(id);
        if(accomEntity.isPresent()) {
            AccomEntity updateAccom=accomEntity.get();
            if(updateAccom.getHostid().getUsername().equals(hostid)) {
                this.accomRepository.deleteById(id);
                return;
            }
            throw new EntityNotFoundException("해당 숙소의 호스트가 아닙니다.");
        }
        throw new EntityNotFoundException("숙소를 찾을 수 없습니다.");
    }

    public void updateCoordinatesForAll() {
        List<AccomEntity> list = this.accomRepository.findAll();

        for (AccomEntity acc : list) {
            if (acc.getLatitude() == null || acc.getLongitude() == null) {
                Map<String, Double> coords = getCoordinatesFromAddress(acc.getAddress());
                if (coords != null) {
                    acc.setLatitude(coords.get("lat"));
                    acc.setLongitude(coords.get("lng"));
                    accomRepository.save(acc);
                }
            }
        }
    }

    private Map<String, Double> getCoordinatesFromAddress(String address) {
        try {
            String url = "https://dapi.kakao.com/v2/local/search/address.json?query=" + URLEncoder.encode(address, "UTF-8");

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Authorization", "KakaoAK " + kakaoApiKey)
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            JSONObject json = new JSONObject(response.body());
            JSONArray documents = json.getJSONArray("documents");

            if (documents.length() > 0) {
                JSONObject obj = documents.getJSONObject(0);
                double lat = obj.getDouble("y");
                double lng = obj.getDouble("x");
                Map<String, Double> coords = new HashMap<>();
                coords.put("lat", lat);
                coords.put("lng", lng);
                return coords;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
