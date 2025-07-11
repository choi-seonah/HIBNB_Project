package com.example.hibnb_project.service;

import com.example.hibnb_project.data.dao.UserDAO;
import com.example.hibnb_project.data.dto.UserDTO;
import com.example.hibnb_project.data.entity.UserEntity;
import com.example.hibnb_project.data.entity.VerificationcodeEntity;
import com.example.hibnb_project.data.repository.VerificationcodeRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
                if(!user.getUsername().equals(username)){
                    throw new EntityNotFoundException("username 불일치");
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

    public UserDTO updateInform(UserDTO userDTO) {
        UserEntity updated=this.userDAO.updateInform(userDTO.getUsername(),userDTO.getName(),userDTO.getPhone(),userDTO.getEmail(),userDTO.getAge());
        UserDTO updatedDTO= UserDTO.builder()
                .username(updated.getUsername())
                .role(updated.getRole())
                .name(updated.getName())
                .phone(updated.getPhone())
                .email(updated.getEmail())
                .age(updated.getAge())
                .build();
        return updatedDTO;
    }

    public Boolean comaprePassword(String username, String password) {
        return this.userDAO.comaprePassword(username, password);
    }

    public UserDTO userInform(String username) {
        UserEntity entity= this.userDAO.userInform(username);
        UserDTO userDTO = UserDTO.builder()
                .name(entity.getName())
                .phone(entity.getPhone())
                .email(entity.getEmail())
                .age(entity.getAge())
                .build();
        return userDTO;
    }

    public String deleteMember(String username) {
        this.userDAO.deleteMember(username);
        return "deleteMember success";
    }
}
