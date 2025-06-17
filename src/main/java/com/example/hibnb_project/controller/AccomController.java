package com.example.hibnb_project.controller;

import com.example.hibnb_project.data.dto.AccomDTO;
import com.example.hibnb_project.data.dto.AccomSeachDTO;
import com.example.hibnb_project.service.AccomService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/accom") // 백 api 기본경로 :"/accom"


public class AccomController {
    private final AccomService accomService;

    @GetMapping(value = "/list")
    public ResponseEntity<List<AccomDTO>> findAllAccoms() {
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
        List<AccomDTO> accomDTOList = this.accomService.findDetailedAccom(accomSeachDTO);
        return ResponseEntity.status(HttpStatus.OK).body(accomDTOList);
    }

    @GetMapping(value = "/list/username")
    public ResponseEntity<List<AccomDTO>> findByUsername(@RequestParam String username) {
        return ResponseEntity.ok(this.accomService.findByHostid(username));
    }

    @GetMapping(value = "/list/review")
    public ResponseEntity<List<AccomDTO>> findByReview() {
        return ResponseEntity.ok(this.accomService.findTop5());
    }

    @PostMapping(value = "/save")
    public ResponseEntity<String> saveAccom(@ModelAttribute AccomDTO accomDTO) throws IOException {
        return ResponseEntity.status(HttpStatus.OK).body(this.accomService.saveAccom(accomDTO));
    }

    @PutMapping(value="/update")
    public ResponseEntity<String> updateAccom(@ModelAttribute AccomDTO accomDTO) throws IOException {
        return ResponseEntity.status(HttpStatus.OK).body(this.accomService.updateAccom(accomDTO));
    }

    @DeleteMapping(value = "/delete")
    public ResponseEntity<String> deleteAccom(@RequestBody AccomDTO accomDTO) {//accomid, hostid 요구
        return ResponseEntity.status(HttpStatus.OK).body(this.accomService.deleteAccom(accomDTO));
    }
}
