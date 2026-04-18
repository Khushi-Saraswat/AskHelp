package com.research.assistant.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.research.assistant.Model.FlashCard;

public interface FlashCardRepository extends JpaRepository<FlashCard,Long> {
     
      

}
