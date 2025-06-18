package com.example.hibnb_project.controller;

import com.example.hibnb_project.data.dao.AccomDAO;
import com.example.hibnb_project.data.dto.AccomDTO;
import com.example.hibnb_project.data.dto.AccomSeachDTO;
import com.example.hibnb_project.service.AccomService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/accom") // 백 api 기본경로 :"/accom"


public class AccomController {
    private final AccomService accomService;
    private final AccomDAO accomDAO;

    @GetMapping(value = "/list")
    public ResponseEntity<List<AccomDTO>> findAllAccoms() {
        this.accomDAO.updateCoordinatesForAll();
        List<AccomDTO> accomDTOList = this.accomService.findAllAccoms();
        return ResponseEntity.status(HttpStatus.OK).body(accomDTOList);
    }

    @GetMapping(value = "/list/detailedlist")
    public ResponseEntity<List<AccomDTO>> findDetailedAccom(
            @RequestParam String address,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkindate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkoutdate,
            @RequestParam Integer maxcapacity
    ) {
        AccomSeachDTO accomSeachDTO = new AccomSeachDTO(address, checkindate, checkoutdate, maxcapacity);
        this.accomDAO.updateCoordinatesForAll();
        List<AccomDTO> accomDTOList = this.accomService.findDetailedAccom(accomSeachDTO);
        return ResponseEntity.status(HttpStatus.OK).body(accomDTOList);
    }

    @GetMapping(value = "/list/username")
    public ResponseEntity<List<AccomDTO>> findByUsername(@RequestParam String username) {
        return ResponseEntity.ok(this.accomService.findByHostid(username));
    }

    @GetMapping(value = "/list/booktop5")
    public ResponseEntity<List<AccomDTO>> findByBookTop5() {
        return ResponseEntity.ok(this.accomService.findByBookTop5());
    }

    @PostMapping(value = "/save")
    public ResponseEntity<String> saveAccom(@ModelAttribute AccomDTO accomDTO) throws IOException {
        String result = this.accomService.saveAccom(accomDTO);
        this.accomDAO.updateCoordinatesForAll();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PutMapping(value="/update")
    public ResponseEntity<String> updateAccom(@ModelAttribute AccomDTO accomDTO) throws IOException {
        String result = this.accomService.updateAccom(accomDTO);
        this.accomDAO.updateCoordinatesForAll();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @DeleteMapping(value = "/delete")
    public ResponseEntity<String> deleteAccom(@RequestBody AccomDTO accomDTO) {//accomid, hostid 요구
        return ResponseEntity.status(HttpStatus.OK).body(this.accomService.deleteAccom(accomDTO));
    }

    @GetMapping("/list/random5")
    public ResponseEntity<List<AccomDTO>> findRandom5() {
        List<AccomDTO> allList = accomService.findAllAccoms(); // 전체 숙소
        Collections.shuffle(allList); // 무작위 섞기
        List<AccomDTO> random5 = allList.stream().limit(5).collect(Collectors.toList());
        return ResponseEntity.ok(random5);
    }

    @PostMapping("/update-coordinates")
    public ResponseEntity<Void> updateCoordinates() {
        this.accomDAO.updateCoordinatesForAll();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/simple/{id}")
    public ResponseEntity<AccomDTO> findById(@PathVariable Integer id) {
        AccomDTO dto = accomService.findById(id);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }

}
