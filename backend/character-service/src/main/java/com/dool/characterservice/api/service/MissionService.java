package com.dool.characterservice.api.service;

import com.dool.characterservice.api.request.MissionRequest;
import com.dool.characterservice.api.response.MissionResponseDto;

import java.util.List;

public interface MissionService {
    MissionResponseDto missionDetail(Long id);
    List<MissionResponseDto> getMission();
    MissionResponseDto creat(MissionRequest missionRequest);
    void del(Long id);

    boolean update(Long id, MissionRequest missionRequest);
}
