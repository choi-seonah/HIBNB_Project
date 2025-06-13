package com.example.hibnb_project.service;

import com.example.hibnb_project.data.dao.UserDAO;
import com.example.hibnb_project.data.dto.UserDTO;
import com.example.hibnb_project.data.entity.UserEntity;
import com.example.hibnb_project.data.entity.VerificationcodeEntity;
import com.example.hibnb_project.data.repository.VerificationcodeRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserDAO userDAO;
    private final VerificationcodeRepository verificationcodeRepository;

    public void join(UserDTO userDTO){
        String joinRole = "";
        String username2 = "";
        String[] split = userDTO.getUsername().split("@");
        if(split.length==2){
            joinRole = "ROLE_"+split[0];
            username2 = split[1];
        }
        if(this.userDAO.isExist(username2)){
            throw new EntityExistsException("username already exists");
        }
        this.userDAO.join(username2, userDTO.getPassword(), joinRole, userDTO.getName(), userDTO.getPhone(), userDTO.getEmail(), userDTO.getAge());
    }

    public String findUserByEamil(String email, String code){
        List<VerificationcodeEntity> verificationcodeEntityList = this.verificationcodeRepository.findByEmail(email);
        if (verificationcodeEntityList.size()>0){
            VerificationcodeEntity verificationcodeEntity = verificationcodeEntityList.get(0);
            if(verificationcodeEntity.getCode().equals(code) && verificationcodeEntity.getExpiresat().isAfter(LocalDateTime.now())){
                UserEntity user = this.userDAO.findByEmail(email);
                if(user==null){
                    throw new EntityNotFoundException("user not found");
                }
                return user.getUsername();
            }
            throw new EntityNotFoundException("code error");
        }
        throw new EntityNotFoundException("code error");
    }

    public Boolean findByUsernameAndEmail(String username, String email, String code){
        List<VerificationcodeEntity> verificationcodeEntityList = this.verificationcodeRepository.findByEmail(email);
        if (verificationcodeEntityList.size()>0){
            VerificationcodeEntity verificationcodeEntity = verificationcodeEntityList.get(0);
            if(verificationcodeEntity.getCode().equals(code) && verificationcodeEntity.getExpiresat().isAfter(LocalDateTime.now())){
                UserEntity user = this.userDAO.findByEmail(email);
                if(user==null){
                    throw new EntityNotFoundException("user not found");
                }
                return true;
            }
            throw new EntityNotFoundException("code error");
        }
        throw new EntityNotFoundException("code error");
    }

    public void resetPassword(String username, String password){
        this.userDAO.resetPassword(username, password);
    }

    public void updateInform(UserDTO userDTO) {
        this.userDAO.updateInform(userDTO.getUsername(),userDTO.getPassword(),userDTO.getName(),userDTO.getPhone(),userDTO.getEmail(),userDTO.getAge());
    }

}
