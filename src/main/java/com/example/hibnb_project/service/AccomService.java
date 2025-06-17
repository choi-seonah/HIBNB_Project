package com.example.hibnb_project.service;


import com.example.hibnb_project.data.dao.AccomDAO;
import com.example.hibnb_project.data.dto.AccomDTO;
import com.example.hibnb_project.data.dto.AccomSeachDTO;
import com.example.hibnb_project.data.dto.ReviewDTO;
import com.example.hibnb_project.data.entity.AccomEntity;
import com.example.hibnb_project.data.entity.BookEntity;
import com.example.hibnb_project.data.entity.ImgEntity;
import com.example.hibnb_project.data.entity.ReviewEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class AccomService {
    private final AccomDAO accomDAO;

    public List<AccomDTO> findAllAccoms() {
        List<AccomEntity> accomEntityList = this.accomDAO.findAllAccoms();
        List<AccomDTO> accomDTOList = new ArrayList<>();
        for (AccomEntity accomE : accomEntityList) {

            double avgSum = 0;
            Set<ReviewEntity> reviewEntityList = accomE.getReviews();
            for (ReviewEntity reE : reviewEntityList) {
                avgSum += reE.getRating();
            }
            double avg = reviewEntityList.size() > 0 ? avgSum / reviewEntityList.size() : 0.0;

            Set<ReviewEntity> review = accomE.getReviews();

            AccomDTO accomDTO = AccomDTO.builder()
                    .id(accomE.getId())
                    .hostid((accomE.getHostid()).getUsername())
                    .hostname(accomE.getHostname())
                    .address(accomE.getAddress())
                    .detailaddr(accomE.getDetailaddr())
                    .description(accomE.getDescription())
                    .type(accomE.getType())
                    .imageUrl(accomE.getImageUrl())
                    .average(avg)
                    .maxcapacity(accomE.getMaxcapacity())
                    .pricePerNight(accomE.getPricePerNight())
                    .bedrooms(accomE.getBedrooms())
                    .beds(accomE.getBeds())
                    .bathrooms(accomE.getBathrooms())
                    .build();
            accomDTOList.add(accomDTO);
        }
        return accomDTOList;
    }

    public List<AccomDTO> findDetailedAccom(AccomSeachDTO accomSeachDTO) {
        List<AccomEntity> accomEntityList = this.accomDAO.findDetailedAccom(accomSeachDTO.getAddress(),
                accomSeachDTO.getCheckindate(), accomSeachDTO.getCheckoutdate(), accomSeachDTO.getMaxcapacity());

        List<AccomDTO> accomDTOList = new ArrayList<>();

        for (AccomEntity accomE : accomEntityList) {
            Set<ReviewDTO> reviewDTOSet = new HashSet<>();

            Set<ReviewEntity> reviewEntitySet = accomE.getReviews();
            for (ReviewEntity reE : reviewEntitySet) {
                ReviewDTO reviewDTO = ReviewDTO.builder()
                        .id(reE.getId())
                        .accomid(reE.getAccomid().getId())
                        .bookid(reE.getBookid().getId())
                        .username(reE.getUsername().getUsername())
                        .rating(reE.getRating())
                        .comment(reE.getComment())
                        .createdAt(reE.getCreatedAt())
                        .build();
                reviewDTOSet.add(reviewDTO);
            }

            double avgSum = 0;
            Set<ReviewEntity> reviewEntityList = accomE.getReviews();
            for (ReviewEntity reE : reviewEntityList) {
                avgSum += reE.getRating();
            }
            double avg = reviewEntityList.size() > 0 ? avgSum / reviewEntityList.size() : 0.0;

            ImgEntity imgEntity = accomE.getImg();

            List<String> imageUrls = new ArrayList<>();

            imageUrls = Stream.of(imgEntity.getImg1(), imgEntity.getImg2(), imgEntity.getImg3(), imgEntity.getImg4())
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());


            AccomDTO accomDTO = AccomDTO.builder()
                    .id(accomE.getId())
                    .hostid((accomE.getHostid()).getUsername())
                    .hostname(accomE.getHostname())
                    .address(accomE.getAddress())
                    .detailaddr(accomE.getDetailaddr())
                    .description(accomE.getDescription())
                    .type(accomE.getType())
                    .imageUrl(accomE.getImageUrl())
                    .average(avg)
                    .maxcapacity(accomE.getMaxcapacity())
                    .pricePerNight(accomE.getPricePerNight())
                    .bedrooms(accomE.getBedrooms())
                    .beds(accomE.getBeds())
                    .bathrooms(accomE.getBathrooms())
                    .imageUrls(!imageUrls.isEmpty() ? imageUrls : null)
                    .reviews(reviewDTOSet)
                    .build();
            accomDTOList.add(accomDTO);
        }
        return accomDTOList;
    }

    public List<AccomDTO> findByHostid(String hostid) {
        List<AccomEntity> accomEntityList = this.accomDAO.findByHostid(hostid);
        List<AccomDTO> accomDTOList = new ArrayList<>();
        for (AccomEntity accomE : accomEntityList) {

            ImgEntity imgEntity = accomE.getImg();
            List<String> urls = new ArrayList<>();
            if (imgEntity != null) {
                urls.add(imgEntity.getImg1());
                urls.add(imgEntity.getImg2());
                urls.add(imgEntity.getImg3());
                urls.add(imgEntity.getImg4());
                urls = urls.stream()
                        .filter(item -> item != null)
                        .collect(Collectors.toList());
            }

            AccomDTO accomDTO = AccomDTO.builder()
                    .id(accomE.getId())
                    .hostid((accomE.getHostid()).getUsername())
                    .hostname(accomE.getHostname())
                    .address(accomE.getAddress())
                    .detailaddr(accomE.getDetailaddr())
                    .description(accomE.getDescription())
                    .imageUrls(urls)
                    .type(accomE.getType())
                    .beds(accomE.getBeds())
                    .bedrooms(accomE.getBedrooms())
                    .bathrooms(accomE.getBathrooms())
                    .imageUrls(!urls.isEmpty() ? urls : null)
                    .maxcapacity(accomE.getMaxcapacity())
                    .pricePerNight(accomE.getPricePerNight())
                    .build();
            accomDTOList.add(accomDTO);
        }
        return accomDTOList;
    }

    public List<AccomDTO> findTop5() {
        List<BookEntity> books = this.accomDAO.findTop5Books();
        List<AccomDTO> accomDTOList = new ArrayList<>();
        for (BookEntity bookEntity : books) {
            AccomEntity accomEntity = bookEntity.getAccomid();
            ImgEntity imgEntity = accomEntity.getImg();
            List<String> urls = new ArrayList<>();
            if (imgEntity != null) {
                urls.add(imgEntity.getImg1());
                urls.add(imgEntity.getImg2());
                urls.add(imgEntity.getImg3());
                urls.add(imgEntity.getImg4());
                urls = urls.stream()
                        .filter(item -> item != null)
                        .collect(Collectors.toList());
            }
            AccomDTO accomDTO = AccomDTO.builder()
                    .id(accomEntity.getId())
                    .hostid((accomEntity.getHostid()).getUsername())
                    .hostname(accomEntity.getHostname())
                    .address(accomEntity.getAddress())
                    .detailaddr(accomEntity.getDetailaddr())
                    .description(accomEntity.getDescription())
                    .type(accomEntity.getType())
                    .beds(accomEntity.getBeds())
                    .bedrooms(accomEntity.getBedrooms())
                    .bathrooms(accomEntity.getBathrooms())
                    .imageUrls(!urls.isEmpty() ? urls : null)
                    .maxcapacity(accomEntity.getMaxcapacity())
                    .pricePerNight(accomEntity.getPricePerNight())
                    .build();
            accomDTOList.add(accomDTO);
        }
        return accomDTOList;
    }


    public String saveAccom(AccomDTO accomDTO) throws IOException {
        this.accomDAO.saveAccom(accomDTO.getHostid(), accomDTO.getHostname(),
                accomDTO.getAddress(), accomDTO.getDetailaddr(), accomDTO.getDescription(), accomDTO.getType(),
                accomDTO.getImageUrl(), accomDTO.getMaxcapacity(), accomDTO.getPricePerNight(), accomDTO.getBedrooms(), accomDTO.getBeds(), accomDTO.getBathrooms(),
                accomDTO.getImages()
        );
        return "숙소 등록 성공";
    }

    public String updateAccom(AccomDTO accomDTO) throws IOException {
        this.accomDAO.updateAccom(accomDTO.getId(), accomDTO.getHostid(), accomDTO.getHostname(),
                accomDTO.getAddress(), accomDTO.getDetailaddr(), accomDTO.getDescription(), accomDTO.getType(),
                 accomDTO.getMaxcapacity(), accomDTO.getPricePerNight(), accomDTO.getBedrooms(), accomDTO.getBeds(), accomDTO.getBathrooms(),
                accomDTO.getImages(), accomDTO.getUrlsToDelete()
        );
        return "숙소 수정 성공";
    }

    public String deleteAccom(AccomDTO accomDTO) {
        this.accomDAO.deleteAccom((accomDTO.getId()), accomDTO.getHostid());
        return "숙소 삭제 성공";
    }

}
