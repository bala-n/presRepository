package com.gt.prescriptor.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.gt.prescriptor.constants.appConstants;
import com.gt.prescriptor.model.Patient;
import com.gt.prescriptor.model.Visits;
import com.gt.prescriptor.repo.PatientVisits;

@RestController
@RequestMapping("${api.base.path}/visit")
public class PatientVisitsController {

	
	@Autowired
	PatientVisits repo;
	
	@RequestMapping(path="/addPatientVisit", method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> addPatientVisit(@RequestBody Visits visit){
	Map<String,Object> data =new HashMap<>();
	data.put("data", repo.addPatientVisit(visit));
	return data;
	}
	
	@RequestMapping(path="/updateVisit", method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> updatePatient(@RequestBody Map<String,Object> visitRecord){
	Map<String,Object> data =new HashMap<>();
	Visits resp=repo.updateVisit(visitRecord);

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

	
	@RequestMapping(path="/getPatientVisits", method=RequestMethod.GET)
	public @ResponseBody Map<String,Object> getPatientVisits(){
	Map<String,Object> data =new HashMap<>();
	data.put("data", repo.getPatientVisits());
	return data;
	}	
	
	@RequestMapping(path="/getPatientVisit", method=RequestMethod.GET)
	public @ResponseBody Map<String,Object> getPatientVisit(@RequestParam("id") long id){
		Map<String,Object> data =new HashMap<>();
		data.put("data", repo.getPatientVisit(id));
		return data;
	}
	
}
