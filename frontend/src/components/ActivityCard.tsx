import {Draggable} from "@hello-pangea/dnd";

type ActivityCardProps = Readonly<{
    activity: any;
    index: number;
    onDelete: (title: string) => void;
}>;

export function ActivityCard({ activity, index, onDelete }: ActivityCardProps) {
    return (
        <Draggable draggableId={activity.title} index={index}>
            {(provided) => (
                <div
                    className="activity-card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {activity.imagePath && (
                        <div className="activity-image-wrapper">
                            <img
                                src={activity.imagePath}
                                alt={activity.title}
                                className="activity-image"
                            />
                        </div>
                    )}
                    <h4>{activity.title}</h4>
                    <button
                        className="delete-activity-button"
                        onClick={() => onDelete(activity.title)}
                    >
                        🗑
                    </button>
                </div>
            )}
        </Draggable>
    );
}