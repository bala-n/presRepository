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
import com.gt.prescriptor.utils.SequenceGenerator;

@Repository
public class PatientRepository {

	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Autowired
	SequenceGenerator sequenceGenerator;
	
	public Patient addPatient(Patient patient) {
		try {
			long newpatID=sequenceGenerator.generateSequence();
			patient.setPatID(newpatID);
			patient.setRequestStatus(appConstants.SUCCESS);
			mongoTemplate.save(patient);
		}
		catch(Exception e) {
			patient.setRequestStatus(appConstants.FAILURE);
		}
		return patient;
     }
	
	
	
	public List<Patient> getPatients(){
		List<Patient> patientLst = new ArrayList<>();
		try {
			patientLst=mongoTemplate.findAll(Patient.class);
		}
		catch(Exception e){
		}
		return patientLst;
	}
	

	public Patient updatePatient(Map<String,Object> patRecord) {
	    Patient patient = new Patient();	
		try {
			Query query=new Query();
			query.addCriteria(Criteria.where(appConstants.PATIENT_ID).is(patRecord.get("patID")));
			Update update =new Update();
			for(Map.Entry<String, Object> mapEntry:patRecord.entrySet()) {
				update.set((String) mapEntry.getKey(),mapEntry.getValue());
			}
			mongoTemplate.updateFirst(query, update, Patient.class);
			patient =mongoTemplate.findOne(query, Patient.class);
			patient.setRequestStatus(appConstants.SUCCESS);
		}
		catch(Exception e) {
			patient.setRequestStatus(appConstants.FAILURE);
		}
		return patient;
     }
	
	public Patient getPatient(long patID){
		System.out.println("PAT ID "+ patID);
		Patient patient = new Patient();
		try {
			Query query=new Query();
			query.addCriteria(Criteria.where(appConstants.PATIENT_ID).is(patID));
			patient=mongoTemplate.findOne(query,Patient.class);
		}
		catch(Exception e){
		}
		return patient;
	}
}
