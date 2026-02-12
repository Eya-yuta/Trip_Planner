package triply.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "trips")

public class Trip {
    @Id
    private String id;

    private String userId;
    private String title;
    private String destination;
    private String startDate;
    private String endDate;
    private String notes;

    private List<Activity> activities;

}
