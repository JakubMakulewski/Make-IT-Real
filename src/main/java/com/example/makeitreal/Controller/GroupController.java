package com.example.makeitreal.Controller;

import com.example.makeitreal.payload.GroupDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/group")
public class GroupController {

    @GetMapping
    public List<GroupDto> getGroups() {
        return null; // ResponseEntity service grupy
    }
}
