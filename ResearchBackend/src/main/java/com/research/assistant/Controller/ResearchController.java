package com.research.assistant.Controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.research.assistant.Service.ResearchService;
import com.research.assistant.request.ChatRequest;
import com.research.assistant.request.SummarizeRequest;
import com.research.assistant.request.ExplainRequest;
import com.research.assistant.request.CitationRequest;
import com.google.common.net.MediaType;
import com.research.assistant.Response.ChatResponse;
import com.research.assistant.Response.SummaryResponse;
import com.research.assistant.Response.ExplainResponse;
import com.research.assistant.Response.CitationResponse;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class ResearchController {

    private final ResearchService researchService;

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

    @PostMapping(value = "/upload",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String upload(@RequestPart("file")MultipartFile file)throws IOException{
        
    }

}
