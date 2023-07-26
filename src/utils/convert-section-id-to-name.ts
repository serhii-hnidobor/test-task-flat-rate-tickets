export default function convertSectionIdToName(id: number) {
  switch (id) {
    case 1: {
      return 'Front Orchestra';
    }
    case 2: {
      return 'Orchestra';
    }
    case 3: {
      return 'Terrace East';
    }
    case 4: {
      return 'Terrace West';
    }
    case 5: {
      return 'Terrace';
    }
    case 6: {
      return 'Terrace East';
    }
    case 7: {
      return 'Terrace West';
    }
    case 9: {
      return 'Balcony';
    }
    default: {
      return 'unknown';
    }
  }
}
