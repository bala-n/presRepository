package com.gt.prescriptor.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.gt.prescriptor.constants.appConstants;

@Document(collection=appConstants.MEDICINE_COLLECTION)
@JsonInclude(Include.NON_NULL)
public class Medicines {

	@Id
	public ObjectId _id;
	private String drugName;
	private String drugDescription;
	private String drugManufacturer;
	private String requestStatus;
	
	public String  get_id() {
		return _id.toHexString();
	}
	public void set_id(ObjectId _id) {
		this._id = _id;
	}
	public String getDrugName() {
		return drugName;
	}
	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}
	public String getDrugDescription() {
		return drugDescription;
	}
	public void setDrugDescription(String drugDescription) {
		this.drugDescription = drugDescription;
	}
	public String getDrugManufacturer() {
		return drugManufacturer;
	}
	public void setDrugManufacturer(String drugManufacturer) {
		this.drugManufacturer = drugManufacturer;
	}
	public String getRequestStatus() {
		return requestStatus;
	}
	public void setRequestStatus(String requestStatus) {
		this.requestStatus = requestStatus;
	}
	
		
	
}
