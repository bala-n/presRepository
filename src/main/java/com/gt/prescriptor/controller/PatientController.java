package com.gt.prescriptor.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.gt.prescriptor.constants.appConstants;
import com.gt.prescriptor.model.Medicines;
import com.gt.prescriptor.model.Patient;
import com.gt.prescriptor.repo.PatientRepository;

@RestController
@RequestMapping("${api.base.path}/patient")
public class PatientController {

	@Autowired
	PatientRepository repo;
	
	@RequestMapping(path="/addPatient", method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> addMedicine(@RequestBody Patient patient){
	Map<String,Object> data =new HashMap<>();
	data.put("data", repo.addPatient(patient));
	return data;
	}
	
	@RequestMapping(path="/updatePatient", method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> updatePatient(@RequestBody Map<String,Object> patRecord){
	Map<String,Object> data =new HashMap<>();
	Patient resp=repo.updatePatient(patRecord);

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
	
	@RequestMapping(path="/getPatients", method=RequestMethod.GET)
	public @ResponseBody Map<String,Object> getPatients(){
	Map<String,Object> data =new HashMap<>();
	data.put("data", repo.getPatients());
	return data;
	}	
	
	@RequestMapping(path="/getPatient", method=RequestMethod.GET)
	public @ResponseBody Map<String,Object> getMedicine(@RequestParam("id") long id){
		Map<String,Object> data =new HashMap<>();
		data.put("data", repo.getPatient(id));
		return data;
	}
	
	
}
	