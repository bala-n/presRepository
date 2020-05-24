package com.gt.prescriptor.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.gt.prescriptor.constants.appConstants;
import com.gt.prescriptor.utils.PrescriptionRecord;

@Document(collection=appConstants.PATIENT_VISITS)
@JsonInclude(Include.NON_NULL)
public class Visits {
	@Id
	public ObjectId _id;
	
	private int patID;
	private String patFirstName;
	private String patLastName;
	private String patLocation;
	private String visitDate;
	private PrescriptionRecord []presList;
	private String requestStatus;
	
	public String getRequestStatus() {
		return requestStatus;
	}
	public void setRequestStatus(String requestStatus) {
		this.requestStatus = requestStatus;
	}
	
	public String  get_id() {
		return _id.toHexString();
	}
	public void set_id(ObjectId _id) {
		this._id = _id;
	}
	
	public int getPatID() {
		return patID;
	}
	public void setPatID(int patID) {
		this.patID = patID;
	}
	public String getPatFirstName() {
		return patFirstName;
	}
	public void setPatFirstName(String patFirstName) {
		this.patFirstName = patFirstName;
	}
	public String getPatLastName() {
		return patLastName;
	}
	public void setPatLastName(String patLastName) {
		this.patLastName = patLastName;
	}
	public String getPatLocation() {
		return patLocation;
	}
	public void setPatLocation(String patLocation) {
		this.patLocation = patLocation;
	}
	public String getVisitDate() {
		return visitDate;
	}
	public void setVisitDate(String visitDate) {
		this.visitDate = visitDate;
	}
	public PrescriptionRecord[] getPresList() {
		return presList;
	}
	public void setPresList(PrescriptionRecord[] presList) {
		this.presList = presList;
	}
	
}
