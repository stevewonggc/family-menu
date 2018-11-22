package com.eateverything.familymenu.controller;

import com.eateverything.familymenu.dao.MenuDao;
import com.eateverything.familymenu.entity.db.Menu;
import com.eateverything.familymenu.entity.http.CommonResponse;
import com.eateverything.familymenu.services.StorageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.IOException;
import java.util.List;

@RestController
public class MenuController {

  @Autowired private MenuDao menuDao;

  @Autowired private StorageService storageService;

  @GetMapping("/menu")
  public Page<Menu> getMenu(@PageableDefault() Pageable pageable) {
    return menuDao.findAll(pageable);
  }

  @PutMapping("/menu")
  public ResponseEntity<CommonResponse> createMenu(@RequestParam("name") String name, @RequestParam("parts") List<String> parts, @RequestParam("file") MultipartFile multipartFile) throws IOException {
    // Save the file
    String picName = storageService.store(multipartFile);

    System.out.println(parts);

    Menu menu = new Menu();
    menu.setName(name);
    menu.setParts(parts);

    System.out.println(MvcUriComponentsBuilder.fromMethodName(PicController.class, "getPicture", picName).build().toString());
    //        menu.setParts(parts);
    menu.setUrl(MvcUriComponentsBuilder.fromMethodName(PicController.class, "getPicture", picName).build().toString());
    menuDao.insert(menu);
    return ResponseEntity.ok().body(new CommonResponse());
  }

}
