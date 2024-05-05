"use client";

import {
  changeTaskOfTheDayTimer,
  getTaskOfTheDayTimer,
} from "@/lib/actions/user.actions";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { toast } from "sonner";

export default function CountdownSection({ userId }: { userId: string }) {
  const [taskOfTheDayTimer, setTaskOfTheDayTimer] = useState<
    number | undefined
  >(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCountdown() {
      setLoading(true);
      const taskOfTheDayTimer = await getTaskOfTheDayTimer(userId);
      setTaskOfTheDayTimer(taskOfTheDayTimer);
      setLoading(false);
    }
    fetchCountdown();
  }, []);

  const onComplete = async () => {
    const newTaskOfTheDayTimer = await changeTaskOfTheDayTimer(userId);
    setTaskOfTheDayTimer(newTaskOfTheDayTimer);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Countdown
          onComplete={onComplete}
          date={taskOfTheDayTimer}
        ></Countdown>
      )}
    </div>
  );
}
