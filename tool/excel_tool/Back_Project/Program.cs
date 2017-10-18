﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Xml;

namespace Back_Project
{
    class Program
    {
        static void translateFileRead()
        {
            string workDir = Environment.CurrentDirectory;
            DirectoryInfo workDirInfo = new DirectoryInfo(workDir);
            string translateFilePath = workDirInfo.Parent.Parent.Parent.Parent.Parent.FullName + @"\excel\_translate.xml";
            //读取文件
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(translateFilePath);
            XmlElement root = xmlDoc.DocumentElement;//取到根结点
            foreach (XmlElement fileNode in root.GetElementsByTagName("file"))
            {
                string oldName, newName;
                oldName = fileNode.GetAttribute("oldName");
                newName = fileNode.GetAttribute("newName");
                code.Data.TranslateFileData translateFileData = new code.Data.TranslateFileData(newName);
                foreach (XmlElement tableNode in root.GetElementsByTagName("table"))
                {
                    string oldTableName, newTableName;
                    oldTableName = tableNode.GetAttribute("oldName");
                    newTableName = tableNode.GetAttribute("newName");
                    translateFileData.addTableName(oldTableName, newTableName);
                }
                code.GlobalData.translateDic.Add(oldName, translateFileData);
            }
        }

        static void Main(string[] args)
        {
            //先获取和处理translate文件
            translateFileRead();
            //先清除原有的配置数据
            string workDir = Environment.CurrentDirectory;
            DirectoryInfo workDirInfo = new DirectoryInfo(workDir);
            string excelDataDirPath = workDirInfo.Parent.Parent.Parent.Parent.Parent.FullName +
                @"\client\cocos\CocosProject\assets\resources\Excel_Data";
            DirectoryInfo workExcelDirInfo = new DirectoryInfo(workDirInfo.Parent.Parent.Parent.Parent.Parent.FullName + @"\excel");
            if (Directory.Exists(excelDataDirPath))
            {
                Directory.Delete(excelDataDirPath, true);
            }
            Directory.CreateDirectory(excelDataDirPath);
            //开始执行每一个file
            foreach (FileInfo xmlFile in workExcelDirInfo.GetFiles())
            {
                if (xmlFile.Name.Equals("_translate.xml"))
                {
                    continue;
                }
                if (xmlFile.Name.IndexOf(".xml") >= 0)
                {
                    string fileName = xmlFile.Name.Split('.')[0];
                    code.Tool.Reader.FileNodeReader fileNodeReader = 
                        new code.Tool.Reader.FileNodeReader(fileName, xmlFile.FullName);
                    code.Data.FileNode fileNode = fileNodeReader.getFileNode();
                    new code.Tool.Writer.FileNodeWriter().xmlDataWrite(fileNode, excelDataDirPath);
                }
            }
            Console.WriteLine("结束！按回车结束！");
            Console.ReadLine();
        }
    }
}
