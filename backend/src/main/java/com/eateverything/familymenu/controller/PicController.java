package com.eateverything.familymenu.controller;

import com.eateverything.familymenu.services.StorageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * @author Steve Wang.
 * @since 22 Nov, 2018 4:59 PM
 */
//@RestController
//@RequestMapping("pic")
public class PicController {

  @Autowired private StorageService storageService;

  @GetMapping("{filename:.+}")
  public ResponseEntity<Resource> getPicture(@PathVariable String filename) {
    Resource picResource = storageService.loadAsResource(filename);
    return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + picResource.getFilename() + "\"")
                         .body(picResource);
  }

}
