package com.eateverything.familymenu.controller;

import com.eateverything.familymenu.dao.MenuDao;
import com.eateverything.familymenu.entity.db.Menu;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("menu")
public class MenuController {

    @Autowired
    private MenuDao menuDao;

    @GetMapping
    public Page<Menu> getMenu(@PageableDefault() Pageable pageable) {
        return menuDao.findAll(pageable);
    }

    @PutMapping
    public void createMenu(@RequestBody Menu menu) {
        menuDao.insert(menu);
    }
}
