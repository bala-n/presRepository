package com.gt.prescriptor.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.gt.prescriptor.constants.appConstants;
import com.gt.prescriptor.model.Medicines;
import com.gt.prescriptor.repo.MedicineRepository;


@RestController
@RequestMapping("${api.base.path}/medicine")
public class MedicineCatController {

	@Autowired
	MedicineRepository repo;
	
	@RequestMapping(path="/addMedicine", method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> addMedicine(@RequestBody Medicines medicine){
	Map<String,Object> data =new HashMap<>();
	data.put("data", repo.addMedicine(medicine));
	return data;
	}
	
	@RequestMapping(path="/updateMedicine", method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> updateMedicine(@RequestBody Map<String,Object> medRecord){
	Map<String,Object> data =new HashMap<>();
	Medicines resp=repo.updateMedicine(medRecord);

	if(appConstants.SUCCESS.equalsIgnoreCase(resp.getRequestStatus())) {
		data.put(appConstants.RESP_DATA, resp);
		data.put(appConstants.REQUEST_STATUS, appConstants.SUCCESS);
		data.put(appConstants.REQUEST_STATUS_MSG, appConstants.UPDATE_TXN_SUCCESS_MSG);
	}else {
		data.put(appConstants.REQUEST_STATUS, appConstants.FAILURE);
		data.put(appConstants.REQUEST_STATUS_MSG, appConstants.UPDATE_TXN_FAILED_MSG);
	}
	return data;
	}
	
	@RequestMapping(path="/getMedicines", method=RequestMethod.GET)
	public @ResponseBody Map<String,Object> getMedicines(){
	Map<String,Object> data =new HashMap<>();
	data.put("data", repo.getMedicines());
	return data;
	}	
	
	
	@RequestMapping(path="/getMedicine", method=RequestMethod.GET)
	public @ResponseBody Map<String,Object> getMedicine(@RequestParam("id") String id){
		Map<String,Object> data =new HashMap<>();
		data.put("data", repo.getMedicine(id));
		return data;
	}
	
	
}
	
	

