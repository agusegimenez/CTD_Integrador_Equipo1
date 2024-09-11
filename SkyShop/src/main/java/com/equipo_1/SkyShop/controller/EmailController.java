package com.equipo_1.SkyShop.controller;

import com.equipo_1.SkyShop.entity.EmailRequest;
import com.equipo_1.SkyShop.service.implementations.EmailService;
import com.sendgrid.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;

@Controller
public class EmailController {
    @Autowired
    private EmailService emailService;

    @PostMapping("/api/sendemail")
    public ResponseEntity<String> sendemail(@RequestBody EmailRequest emailRequest) throws IOException {
        Response response = emailService.sendEmail(emailRequest);
        if (response.getStatusCode()==200 || response.getStatusCode()==202){
            return new ResponseEntity<>("Email Send Successfully", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Failed to send Email", HttpStatus.NOT_FOUND);
        }

    }
}
