export interface CommuteButtonProps {
  setWorkingHours: (hours: string) => void; // setWorkingHours 함수
  workonoff: boolean; // workonoff 상태
  setModalOpen: (open: boolean) => void; // setModal 함수
  $isIcon: boolean; // $isIcon 프롭
  setWorkonoff: (value: boolean) => void;
}

export interface CommuteModalProps {
  workonoff: boolean;
  setWorkonoff: (value: boolean) => void;
  setModalOpen: (open: boolean) => void;
  workingHours: string;
  modalOpen: boolean;
}
