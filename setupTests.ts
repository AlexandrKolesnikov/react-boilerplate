import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import dotenv from 'dotenv';
import path from 'path';

const environmentFilePath = path.resolve(__dirname, './environments/.env.test');

dotenv.config({ path: environmentFilePath });

Enzyme.configure({ adapter: new Adapter() });
