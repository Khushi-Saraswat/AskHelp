package com.research.assistant.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.research.assistant.Service.RagService;
import com.research.assistant.Service.ResearchService;
import com.research.assistant.request.ChatRequest;
import com.research.assistant.request.SummarizeRequest;
import com.research.assistant.request.ExplainRequest;
import com.research.assistant.request.CitationRequest;
import com.research.assistant.request.FlashcardRequest;
import com.research.assistant.request.Question;
import com.research.assistant.request.RagQuestion;
import com.research.assistant.Response.ChatResponse;
import com.research.assistant.Response.SummaryResponse;
import com.research.assistant.Response.ExplainResponse;
import com.research.assistant.Response.CitationResponse;
import com.research.assistant.Response.FlashcardResponse;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class ResearchController {

    @Autowired
    private ResearchService researchService;

    @Autowired
    private  RagService ragService;

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> processContent(@RequestBody ChatRequest request) {

        System.out.println(request + "" + "request");
        String result = researchService.processContent(request,"chat");
        System.out.println(result + "" + "result");
        ChatResponse response = new ChatResponse();
        response.setReply(result);
        return ResponseEntity.ok(response);

    }


    @PostMapping("/summarize")
     public ResponseEntity<SummaryResponse> SummarizeContent(@RequestBody SummarizeRequest request) {

        System.out.println(request + "" + "request");
        String result = researchService.SummarizeContent(request,"summarize");
        System.out.println(result + "" + "result");
        SummaryResponse summaryResponse=new SummaryResponse();
        summaryResponse.setSummary(result);
        return ResponseEntity.ok(summaryResponse);

    }

    @PostMapping("/explain")
    public ResponseEntity<ExplainResponse> explainConcept(@RequestBody ExplainRequest request) {

        System.out.println(request + "" + "request");
        String result = researchService.explainConcept(request, "explain");
        System.out.println(result + "" + "result");
        ExplainResponse explainResponse = new ExplainResponse();
        explainResponse.setExplanation(result);
        return ResponseEntity.ok(explainResponse);

    }

    @PostMapping("/cite")
    public ResponseEntity<CitationResponse> generateCitation(@RequestBody CitationRequest request) {

        System.out.println(request + "" + "request");
        String result = researchService.generateCitation(request, "citation");
        System.out.println(result + "" + "result");
        CitationResponse citationResponse = new CitationResponse();
        citationResponse.setCitation(result);
        return ResponseEntity.ok(citationResponse);

    }

    @PostMapping("/flashcards")
    public ResponseEntity<FlashcardResponse> generateFlashcards(@RequestBody FlashcardRequest request) {

        System.out.println(request + "" + "request");
        FlashcardResponse result = researchService.generateFlashcards(request);
        System.out.println(result + "" + "result");
        return ResponseEntity.ok(result);

    }

    @PostMapping("/saveQA")
    public ResponseEntity<String>saveQuestionAnswer(@RequestBody Question question){
        // Save the question and answer to the database
        String s= researchService.saveFlashCards(question);
        return ResponseEntity.ok(s);
    }

    @PostMapping("/ask/rag")
    public ResponseEntity<String> askRagQuestion(@RequestBody RagQuestion question) {
        // Process the RAG question
        String result = ragService.ask(question);
        System.out.println("print"+"print");
        return ResponseEntity.ok(result);
    }

}
