package com.research.assistant.Service;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.research.assistant.Model.FlashCard;
import com.research.assistant.Repository.FlashCardRepository;
import com.research.assistant.request.RagQuestion;

@Service
public class RagService {

    @Autowired
    private ResearchService researchService;
    
    @Autowired
    private FlashCardRepository flashCardRepository;

    public String ask(RagQuestion question){

       List<FlashCard> flashcards=flashCardRepository.findAll();

       List<FlashCard> filteredCards = flashcards.stream().filter(c->c.getQuestion().equals(question.getQuestion()) ||
       c.getAnswer().equals(question.getQuestion()) ).limit(3).toList();;

       if(filteredCards.isEmpty()){
        return flashcards.stream().limit(3).toList().toString();
       }

       String context=filteredCards.stream().map(c->"Question: "+c.getQuestion()+"\nAnswer: "+c.getAnswer())
       .collect(Collectors.joining("\n\n"));

       return researchService.askHelp(context,question.getQuestion());

    }
    
}
