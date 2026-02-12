package triply.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TripDTO {

    private String title;
    private String destination;
    private String startDate;
    private String endDate;
    private String notes;

    private List<Activity> activities;
}
