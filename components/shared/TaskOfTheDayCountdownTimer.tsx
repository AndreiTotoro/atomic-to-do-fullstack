"use client";

import {
  changeTaskOfTheDayTimer,
  getTaskOfTheDayTimer,
} from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { toast } from "sonner";

export default function TaskOfTheDayCountdownTimer({
  userId,
  hasUserCompletedTaskOfTheDay,
}: {
  hasUserCompletedTaskOfTheDay: boolean;
  userId: string;
}) {
  const [taskOfTheDayTimer, setTaskOfTheDayTimer] = useState<
    number | undefined
  >(0);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

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
    router.refresh();
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="text-center">
          <Countdown
            className="font-bold"
            key={taskOfTheDayTimer} // Add this line
            onComplete={onComplete}
            date={taskOfTheDayTimer}
          ></Countdown>
          {hasUserCompletedTaskOfTheDay ? (
            <h1>Left until you can complete a new one</h1>
          ) : (
            <h1>Left to complete your daily task!</h1>
          )}
        </div>
      )}
    </div>
  );
}
