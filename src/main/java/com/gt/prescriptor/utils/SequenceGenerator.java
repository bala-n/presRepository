package com.gt.prescriptor.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.Objects;

import static org.springframework.data.mongodb.core.query.Criteria.where;

import org.springframework.stereotype.Service;

import com.gt.prescriptor.model.Sequence;

@Service
public class SequenceGenerator {

	private MongoOperations mongoOperations;
	
	@Autowired
	public SequenceGenerator(MongoOperations mongoOperations) {
		this.mongoOperations=mongoOperations;
	}
	
	public long generateSequence()
	{
		Sequence counter=mongoOperations.findAndModify(query(where("genStart").is(1000)),
				new Update().inc("counter",1), options().returnNew(true).upsert(true),
				Sequence.class);
		return !Objects.isNull(counter)? counter.getCounter():1000;
	}

	
}
