import Swal, { SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import prisma from '../lib/prisma';
import { JWTSession } from '../pages/api/auth/[...nextauth]';

const MySwal = withReactContent(Swal);

// eslint-disable-next-line consistent-return
// Did this because it shoulnd't return anything if the user isn't blacklisted.
const CheckBlacklisted = async (token: JWTSession): Promise<boolean> => {
  const blacklisted = await prisma.blacklist.findFirst({
    where: {
      userId: token.user.id,
    },
  });
  return !!blacklisted;
};

export default CheckBlacklisted;
