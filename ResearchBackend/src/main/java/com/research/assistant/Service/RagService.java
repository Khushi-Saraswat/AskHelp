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

    public String ask(RagQuestion question) {

        List<FlashCard> flashcards = flashCardRepository.findAll();

        String userQuery = question.getQuestion().toLowerCase();

        // Better retrieval (keyword + partial match)
        List<FlashCard> filteredCards = flashcards.stream()
                .filter(c ->
                        c.getQuestion().toLowerCase().contains(userQuery) ||
                        c.getAnswer().toLowerCase().contains(userQuery) ||
                        userQuery.contains(c.getQuestion().toLowerCase())
                )
                .limit(5)
                .toList();

        // IMPORTANT: fallback so AI never gets empty context
        if (filteredCards.isEmpty()) {
            filteredCards = flashcards.stream()
                    .limit(5)
                    .toList();
        }

        // Build clean context for LLM
        String context = filteredCards.stream()
                .map(c -> "Question: " + c.getQuestion() + "\nAnswer: " + c.getAnswer())
                .collect(Collectors.joining("\n\n"));

        System.out.println(context+"context");

        return researchService.askHelp(context, question.getQuestion());
    }
}
