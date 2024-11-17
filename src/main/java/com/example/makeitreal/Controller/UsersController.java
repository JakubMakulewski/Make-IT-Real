package com.example.makeitreal.Controller;


import com.example.makeitreal.payload.UserResponse;
import com.example.makeitreal.payload.UsersDto;
import com.example.makeitreal.utils.AppCostants;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UsersController {


    @GetMapping
    public UserResponse getUsers(
            @RequestParam(value = "pageNo", defaultValue = AppCostants.DEAFULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = AppCostants.DEFAUL_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppCostants.DEAFULT_SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppCostants.DEFAULT_SORT_DIRECTION, required = false) String sortDir
    ){
        return null; // userService tutaj sie dolaczy pobieranie z bazy wszystkich uzytkownikow
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsersDto> getUserById(@PathVariable(name = "id") Long id){
        return null; // userService tutaj sie dolaczy pobieranie uzytkownika po id
    }

}

