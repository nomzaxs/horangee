package com.dool.socialservice.api.service;

import com.dool.socialservice.api.request.CreateDiaryRequest;
import com.dool.socialservice.api.request.UpdateDiaryRequest;
import com.dool.socialservice.db.domain.Diary;

import java.util.List;

public interface DiaryService {
    public Diary getDiary(Long id);
    public List<Diary> getDiaryByCharacters(Long charactersId);
    public List<Diary> getAllDiary();
    public List<Diary> getDiaryByUserCharacter(Long userCharacterId);
    public Diary updateDiary(UpdateDiaryRequest request);
    public Diary createDiary(CreateDiaryRequest request);
    public void deleteDiary(Long id);
}