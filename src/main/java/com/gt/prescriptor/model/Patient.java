package com.gt.prescriptor.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.gt.prescriptor.constants.appConstants;
import com.gt.prescriptor.utils.PatientHealthStat;

@Document(collection=appConstants.PATIENT_COLLECTION)
@JsonInclude(Include.NON_NULL)
public class Patient {

	@Id
	public ObjectId _id;
	private long patID;
	private long patMobile;
	private String patFirstName;
	private String patLastName;
	private String patLocation;
	private String patGender;
	private String patDOB;
	private String patFirstVisit;
	private PatientHealthStat patHealthStat;
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
	
	public long getPatID() {
		return patID;
	}
	public void setPatID(long patID) {
		this.patID = patID;
	}
	public long getPatMobile() {
		return patMobile;
	}
	public void setPatMobile(long patMobile) {
		this.patMobile = patMobile;
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
	public String getPatGender() {
		return patGender;
	}
	public void setPatGender(String patGender) {
		this.patGender = patGender;
	}
	public String getPatDOB() {
		return patDOB;
	}
	public void setPatDOB(String patDOB) {
		this.patDOB = patDOB;
	}
	public String getPatFirstVisit() {
		return patFirstVisit;
	}
	public void setPatFirstVisit(String patFirstVisit) {
		this.patFirstVisit = patFirstVisit;
	}
	public PatientHealthStat getPatHealthStat() {
		return patHealthStat;
	}
	public void setPatHealthStat(PatientHealthStat patHealthStat) {
		this.patHealthStat = patHealthStat;
	}
	
	
}
