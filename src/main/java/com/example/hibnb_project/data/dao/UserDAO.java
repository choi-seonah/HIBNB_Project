package com.example.hibnb_project.data.dao;

import com.example.hibnb_project.data.dto.UserDTO;
import com.example.hibnb_project.data.entity.UserEntity;
import com.example.hibnb_project.data.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDAO {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public Boolean isExist(String username) {
        return this.userRepository.existsById(username);
    }

    public UserEntity findById(String username) {
        return this.userRepository.findById(username).orElse(null);
    }

    public void join(String username, String password, String role, String name, String phone, String email, Integer age) {
//        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); 조인 확인
        UserEntity authenticationEntity = UserEntity.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .role(role)
                .name(name)
                .phone(phone)
                .email(email)
                .age(age)
                .build();
        this.userRepository.save(authenticationEntity);
    }

    public UserEntity findByEmail(String email) {
        Optional<UserEntity> user = this.userRepository.findByEmail(email);
        return user.orElse(null);
    }

    public void resetPassword(String username, String password) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        Optional<UserEntity> user = this.userRepository.findById(username);
        if (user.isPresent()) {
            UserEntity userEntity = user.get();
            userEntity.setPassword(passwordEncoder.encode(password));
            this.userRepository.save(userEntity);
            return;
        }
        throw new EntityNotFoundException("user not found");
    }

    public UserEntity updateInform(String username, String name, String phone, String email, Integer age){
        Optional<UserEntity> user=this.userRepository.findById(username);
        if(user.isPresent()){
            UserEntity updateUser= user.get();

            updateUser.setName(name);
            updateUser.setPhone(phone);
            updateUser.setEmail(email);
            updateUser.setAge(age);

            this.userRepository.save(updateUser);
            return updateUser;
        }
        throw new EntityNotFoundException("user not found");
    }

    public boolean comaprePassword(String username,String password) {
        Optional<UserEntity> user= this.userRepository.findById(username);
        if(user.isPresent()){
            UserEntity updateUser= user.get();
            boolean match = passwordEncoder.matches(password, updateUser.getPassword());
            return match;
        }
        throw new EntityNotFoundException("user not found");
    }

    public UserEntity userInform(String username) {
        Optional<UserEntity> user = this.userRepository.findById(username);
        if(user.isPresent()){
            return user.get();
        }
        throw new EntityNotFoundException("user not found");
    }

    public void deleteMember(String username) {
        Optional<UserEntity> user = this.userRepository.findById(username);
        if(user.isPresent()){
            this.userRepository.delete(user.get());
        }else {
            throw new EntityNotFoundException("user not found");
        }
    }
}
