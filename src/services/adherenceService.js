const DoseLog = require('../models/DoseLog');

const calculateAdherence = async (userId) => {
  const logs = await DoseLog.find({ userId });

  if (!logs || logs.length === 0) {
    return {
      adherenceScore: 0,
      onTime: 0,
      late: 0,
      missed: 0,
      totalScheduled: 0
    };
  }

  let onTime = 0;
  let late = 0;
  let missed = 0;

  logs.forEach((log) => {
    if (log.status === 'taken') {
      onTime += 1;
    } else if (log.status === 'late') {
      late += 1;
    } else if (log.status === 'missed') {
      missed += 1;
    }
  });

  const totalScheduled = logs.length;
  const adherenceScore =
    totalScheduled === 0
      ? 0
      : (((onTime * 1) + (late * 0.5)) / totalScheduled) * 100;

  return {
    adherenceScore: Math.round(adherenceScore),
    onTime,
    late,
    missed,
    totalScheduled
  };
};

module.exports = {
  calculateAdherence
};

