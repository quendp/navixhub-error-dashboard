const Card = ({ count, startDate, endDate, description }) => {
  return (
    <div className="overviewCard">
      <div>
        <span>{count}</span>
        <span>{description}</span>
      </div>
      <div>
        <p>
          {startDate} - {endDate}
        </p>
      </div>
    </div>
  );
};

export default Card;
