package com.gt.prescriptor.repo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.gt.prescriptor.constants.appConstants;
import com.gt.prescriptor.model.Medicines;
import com.gt.prescriptor.model.Patient;
import com.gt.prescriptor.model.Visits;

@Repository
public class PatientVisits {
	@Autowired
	private MongoTemplate mongoTemplate;
	
	
	public Visits addPatientVisit(Visits visit) {
		try {
			mongoTemplate.save(visit);
			visit.setRequestStatus(appConstants.SUCCESS);
		}
		catch(Exception e) {
			visit.setRequestStatus(appConstants.FAILURE);
		}
		return visit;
     }
	

	public Visits updateVisit(Map<String,Object> visitRecord) {
	    Visits visit = new Visits();	
		try {
			Query query=new Query();
			query.addCriteria(Criteria.where(appConstants.PATIENT_ID).is(visitRecord.get("patID")));
			query.addCriteria(Criteria.where("visitDate").is(visitRecord.get("visitDate")));
			Update update =new Update();
			for(Map.Entry<String, Object> mapEntry:visitRecord.entrySet()) {
				update.set((String) mapEntry.getKey(),mapEntry.getValue());
			}
			mongoTemplate.updateFirst(query, update, Visits.class);
			visit =mongoTemplate.findOne(query, Visits.class);
			visit.setRequestStatus(appConstants.SUCCESS);
		}
		catch(Exception e) {
			visit.setRequestStatus(appConstants.FAILURE);
		}
		return visit;
     }
	
		
	public List<Visits> getPatientVisits(){
		List<Visits> visitLst = new ArrayList<>();
		try {
			visitLst=mongoTemplate.findAll(Visits.class);
		}
		catch(Exception e){
		}
		return visitLst;
	}
	
	public List<Visits> getPatientVisit(long patID){
		System.out.println("PAT ID "+ patID);
		List<Visits> visitLst = new ArrayList<>();
		try {
			Query query=new Query();
			query.addCriteria(Criteria.where(appConstants.PATIENT_ID).is(patID));
			visitLst=mongoTemplate.find(query,Visits.class);
		}
		catch(Exception e){
		}
		return visitLst;
	}

}
