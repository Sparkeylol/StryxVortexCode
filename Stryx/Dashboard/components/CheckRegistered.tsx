import { PrismaClient } from '@prisma/client';
import Swal, { SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { JWTSession } from '../pages/api/auth/[...nextauth]';

const MySwal = withReactContent(Swal);

const prisma = new PrismaClient();

// eslint-disable-next-line consistent-return
const CheckRegistered = async (guildId: string): Promise<boolean> => {
  const guild = await prisma.guilds.findUnique({
    where: {
      guildId,
    },
  });
  if (!guild) {
    return true;
  }
  return false;
};

export default CheckRegistered;
