import {Droppable} from "@hello-pangea/dnd";
import {ActivityCard} from "./ActivityCard.tsx";

type DaySectionProps = Readonly<{
    day: number;
    activities: any[];
    onDelete: (title: string) => void;
}>;

export function DaySection({ day, activities, onDelete }: DaySectionProps) {
    return (
        <div className="day-section">
            <h2>Day {day}</h2>

            <Droppable droppableId={`day-${day}`}>
                {(provided) => (
                    <div
                        className="activities-grid"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {activities?.map((activity, index) => (
                            <ActivityCard
                                key={activity.title}
                                activity={activity}
                                index={index}
                                onDelete={onDelete}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}