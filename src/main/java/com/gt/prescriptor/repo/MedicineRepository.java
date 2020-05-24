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

@Repository
public class MedicineRepository {
	@Autowired
	private MongoTemplate mongoTemplate;
	
	
	public Medicines addMedicine(Medicines medicine) {
		try {
			mongoTemplate.save(medicine);
			medicine.setRequestStatus(appConstants.SUCCESS);
		}
		catch(Exception e) {
			medicine.setRequestStatus(appConstants.FAILURE);
		}
		return medicine;
     }
	
	
	public Medicines updateMedicine(Map<String,Object> medRecord) {
	    Medicines medicine = new Medicines();	
		try {
			Query query=new Query();
			query.addCriteria(Criteria.where(appConstants.DRUG_NAME).is(medRecord.get("drugName")));
			Update update =new Update();
			for(Map.Entry<String, Object> mapEntry:medRecord.entrySet()) {
				update.set((String) mapEntry.getKey(),mapEntry.getValue());
			}
			mongoTemplate.updateFirst(query, update, Medicines.class);
			medicine =mongoTemplate.findOne(query, Medicines.class);
			medicine.setRequestStatus(appConstants.SUCCESS);
		}
		catch(Exception e) {
			medicine.setRequestStatus(appConstants.FAILURE);
		}
		return medicine;
     }
	
	public Medicines getMedicine(String drugName){
		System.out.println("Drug Name "+ drugName);
		Medicines medicine = new Medicines();
		try {
			Query query=new Query();
			query.addCriteria(Criteria.where(appConstants.DRUG_NAME).is(drugName));
			medicine=mongoTemplate.findOne(query,Medicines.class);
		}
		catch(Exception e){
		}
		return medicine;
	}
	
	
	public List<Medicines> getMedicines(){
		List<Medicines> medicineLst = new ArrayList<>();
		try {
			medicineLst=mongoTemplate.findAll(Medicines.class);
		}
		catch(Exception e){
		}
		return medicineLst;
	}
}