package com.example.makeitreal;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MakeItRealApplication {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    public static void main(String[] args) {
        SpringApplication.run(MakeItRealApplication.class, args);
    }



//    #http://localhost:5051/api/auth/register
//            #przykladowe dane do rejestracji
//#{
//#"name" : "boby",
//#"username": "boby123",
//#"email": "boby@gmail.com",
//#"password":"boby"
//#}
//#http://localhost:5051/api/auth/login
//            #przykladowe dane do logowania
//
//#{
//#"usernameOrEmail" : "boby123",
//#"password":"boby"
//#}
}
