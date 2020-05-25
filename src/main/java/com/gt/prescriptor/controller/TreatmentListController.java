package com.gt.prescriptor.controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.gt.prescriptor.repo.TreatmentRepository;

@RestController
@RequestMapping("${api.base.path}/treatments")
public class TreatmentListController {

	@Autowired
	TreatmentRepository repo;
	
		
	@RequestMapping(path="/", method=RequestMethod.GET)
	public @ResponseBody Map<String,Object> getTreatmentList(){
	Map<String,Object> data =new HashMap<>();
	data.put("data", repo.getTreatmentList());
	return data;
	}	
	
}