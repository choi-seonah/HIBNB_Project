package com.example.hibnb_project.service;


import com.example.hibnb_project.data.dao.AccomDAO;
import com.example.hibnb_project.data.dto.AccomDTO;
import com.example.hibnb_project.data.dto.AccomSeachDTO;
import com.example.hibnb_project.data.entity.AccomEntity;
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
