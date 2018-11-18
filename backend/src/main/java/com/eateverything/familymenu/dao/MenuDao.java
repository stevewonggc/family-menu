package com.eateverything.familymenu.dao;

import com.eateverything.familymenu.entity.db.Menu;
import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuDao extends MongoRepository<Menu, Long> {
    @Override
    <S extends Menu> List<S> findAll(Example<S> example);
}
