package com.gt.prescriptor.model;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.gt.prescriptor.constants.appConstants;

@Document(collection=appConstants.SEQUENCE_GENERATOR)
@JsonInclude(Include.NON_NULL)
public class Sequence {
	
	@Id
	public ObjectId _id;
	private int genStart;
	private int counter;
	private int incCounter;

	public String get_id() {
		return _id.toHexString();
	}
	public void set_id(ObjectId _id) {
		this._id = _id;
	}
	
	public int getGenStart() {
		return genStart;
	}
	public void setGenStart(int genStart) {
		this.genStart = genStart;
	}
	public int getCounter() {
		return counter;
	}
	public void setCounter(int counter) {
		this.counter = counter;
	}
	public int getIncCounter() {
		return incCounter;
	}
	public void setIncCounter(int incCounter) {
		this.incCounter = incCounter;
	}

}
