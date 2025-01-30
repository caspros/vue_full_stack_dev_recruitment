import { ref, watch } from "vue";

export function useMatchingCalculationListener() {
  const caregiverMatchingChannel = ref(null);
  const caregiverMatchingInProgress = ref(false);
  const delay = ref(false);
  const watchCaregiverMatching = ({ caregiver }) => {
    watch(
      () => caregiver.value,
      (v, ov) => {
        if (v && (!ov || ov.id !== v.id)) {
          if (caregiverMatchingChannel.value) {
            window.Echo.leaveChannel(caregiverMatchingChannel.value.name);
          }
          caregiverMatchingChannel.value = window.Echo.private(
            `caregiver.${parseInt(v.id)}`,
          );
          console.log(caregiverMatchingChannel.value);
          caregiverMatchingChannel.value.listen(
            "ProgressMatchingEvent",
            data => {
              if (delay.value) {
                clearTimeout(delay.value);
              }
              delay.value = setTimeout(() => {
                caregiverMatchingInProgress.value = false;
              }, 30000);
              caregiverMatchingInProgress.value = !!(
                (data?.progress || data.progress === 0) &&
                data.progress < 100
              );
            },
          );
        }
      },
      {
        immediate: true,
      },
    );
  };

  return { watchCaregiverMatching, caregiverMatchingInProgress };
}
