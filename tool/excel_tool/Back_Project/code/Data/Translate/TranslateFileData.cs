using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back_Project.code.Data
{
    class TranslateFileData
    {
        private string _newFileName;
        private Dictionary<string, string> _dic = new Dictionary<string, string>();

        public TranslateFileData(string newFileName)
        {
            _newFileName = newFileName;
        }

        public string getFileNewMame()
        {
            return _newFileName;
        }

        public void addTableName(string oldName, string newName)
        {
            //理论上的话是没有相同的oldName的
            if (_dic.ContainsKey(oldName))
            {
                return;
            }
            _dic.Add(oldName, newName);
        }

        //不存在的话返回oldName
        public string getNewName(string oldName)
        {
            if (!_dic.ContainsKey(oldName))
            {
                return oldName;
            }
            return _dic[oldName];
        }
    }
}
