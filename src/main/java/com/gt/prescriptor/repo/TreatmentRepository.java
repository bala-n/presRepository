package com.gt.prescriptor.repo;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;


import com.gt.prescriptor.model.Treatment;

@Repository
public class TreatmentRepository {
	@Autowired
	private MongoTemplate mongoTemplate;
	
	public List<Treatment> getTreatmentList(){
		List<Treatment> treatmentLst=new ArrayList<>();
		try {
			Query query=new Query();
			query.fields().exclude("Id");
			treatmentLst=mongoTemplate.find(query,Treatment.class);
			System.out.println(treatmentLst);
		}
		catch(Exception e){
			System.out.println(e);
		}
		return treatmentLst;
	}

}
