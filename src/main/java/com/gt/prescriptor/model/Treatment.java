package com.gt.prescriptor.model;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.gt.prescriptor.constants.appConstants;


@Document(collection=appConstants.TREATMENT_COLLECTION)
@JsonInclude(Include.NON_NULL)
public class Treatment {
	@Id
	public ObjectId _id;
	private List<String> treatmentList;
	
	
	public String  get_id() {
		return _id.toHexString();
	}
	public void set_id(ObjectId _id) {
		this._id = _id;
	}
	
	
	public List<String> getTreatmentList() {
		return treatmentList;
	}
	public void setTreatmentList(List<String> treatmentList) {
		this.treatmentList = treatmentList;
	}
}