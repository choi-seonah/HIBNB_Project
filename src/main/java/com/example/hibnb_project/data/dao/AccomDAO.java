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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Consumer;

@Service
@RequiredArgsConstructor
public class AccomDAO {
    private final AccomRepository accomRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

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
        return this.bookRepository.findTop5ByOrderByAccomidDescAccomidDesc();
    }

    public List<AccomEntity> findByHostid(String hostid){
        UserEntity user = this.userRepository.findById(hostid).orElse(null);
        if(user==null){
            throw new EntityNotFoundException("User not found");
        }
        List<AccomEntity> accomEntityList = this.accomRepository.findByHostid(user);
        if(accomEntityList.isEmpty()){
            return null;
        }
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
                    String url = imgToUpdate.getImg1().substring(20);
                    this.deleteFileByUrl("C:/Users/803-18/Desktop/sihyun-spring-project/1. team-project/"+url);
                    imgToUpdate.setImg1(null);
                } else if (urlToDelete.equals(imgToUpdate.getImg2())) {
                    String url = imgToUpdate.getImg2().substring(20);
                    this.deleteFileByUrl("C:/Users/803-18/Desktop/sihyun-spring-project/1. team-project/"+url);
                    imgToUpdate.setImg2(null);
                } else if (urlToDelete.equals(imgToUpdate.getImg3())) {
                    String url = imgToUpdate.getImg3().substring(20);
                    this.deleteFileByUrl("C:/Users/803-18/Desktop/sihyun-spring-project/1. team-project/"+url);
                    imgToUpdate.setImg3(null);
                } else if (urlToDelete.equals(imgToUpdate.getImg4())) {
                    String url = imgToUpdate.getImg4().substring(20);
                    this.deleteFileByUrl("C:/Users/803-18/Desktop/sihyun-spring-project/1. team-project/"+url);
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
}
